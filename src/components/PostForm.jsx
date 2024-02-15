/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import RTEditor from './RTEditor'
import { useEffect } from 'react'
import bucketService from '../appwrite/bucketService'
import databaseService from '../appwrite/databaseService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title,
            slug: post?.slug,
            content: post?.content,
            status: post?.status,
            image: post?.image
        }
    })

    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()

    const getSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
    }

    const onSubmit = async (data) => {
        if (post) {
            const file = data.image[ 0 ] ? await bucketService.uploadFile(file) : null
            if (file) {
                // delete previous image
                if (post?.image) {
                    await bucketService.deleteFile(post?.image)
                }
            }

            const updatedPost = await databaseService.updatePost(post.$id, {
                ...data,
                image: file ? file?.$id : null
            })

            if (updatedPost) {
                navigate(`/post/${updatedPost?.$id}`)
            }
        } else {
            const file = data.image[ 0 ] ? await bucketService.uploadFile(data.image[ 0 ]) : null
            if (file) {
                console.log(file, userData, data);
                const newPost = await databaseService.createPost({
                    ...data,
                    image: file?.$id,
                    userId: userData.$id
                })

                if (newPost) {
                    navigate(`/post/${newPost?.$id}`)
                }
            }
        }
    }

    // Watch for changes in title
    useEffect(() => {
        watch((data, { name }) => {
            if (name === 'title') {
                setValue('slug', getSlug(data.title))
            }
        })
    }, [ watch, setValue ])

    return (
        <>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        label="Title"
                        placeholder="Enter title"
                        {...register('title', {
                            required: true
                        })}
                    />
                </div>

                <div>
                    <Input
                        label="Slug"
                        placeholder="Slug will be automatically generated"
                        {...register('slug', {
                            required: true
                        })}
                    />
                </div>

                <div>
                    {post && (
                        <img
                            className="w-[50px] h-[50px] object-contain"
                            src={bucketService.getFilePreview(post?.image)}
                            alt={post?.title}
                        />
                    )}
                    <Input
                        label="Image"
                        type="file"
                        accept="image/*"
                        {...register('image', {
                            required: !post
                        })}
                    />
                </div>

                <div>
                    <Select
                        label="Status"
                        options={[
                            {
                                value: 'draft',
                                label: 'Draft'
                            },
                            {
                                value: 'published',
                                label: 'Published'
                            }
                        ]}
                        {...register('status', {
                            required: true
                        })}
                    />
                </div>

                <div>
                    <RTEditor
                        label={'Content:'}
                        name="content"
                        control={control}
                        defaultValue={getValues('content') || post?.content}
                    />
                </div>
                <div>
                    <Button type="submit">{post ? 'Update Post' : 'Create Post'}</Button>
                </div>
            </form>
        </>
    )
}
