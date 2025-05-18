import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import {
	Box,
	Button,
	TextField,
	Typography,
	IconButton,
	Stack,
	CircularProgress,
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { instance } from '../utils/Axios'
import { v4 as uuidv4 } from 'uuid'

interface CreatePostProps {
	onPostCreated?: () => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 МБ

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
	const [content, setContent] = useState('')
	const [image, setImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Обновляем превью при выборе изображения
	useEffect(() => {
		if (!image) {
			setImagePreview(null)
			return
		}

		const objectUrl = URL.createObjectURL(image)
		setImagePreview(objectUrl)

		// Очистка URL при размонтировании или смене файла
		return () => URL.revokeObjectURL(objectUrl)
	}, [image])

	const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value)
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]

			// Проверка типа файла
			if (!file.type.startsWith('image/')) {
				setError('Можно загружать только изображения')
				setImage(null)
				return
			}

			// Проверка размера файла
			if (file.size > MAX_FILE_SIZE) {
				setError('Размер файла не должен превышать 5 МБ')
				setImage(null)
				return
			}

			setImage(file)
		}
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)

		if (!content.trim() && !image) {
			setError('Пожалуйста, добавьте текст или изображение')
			return
		}

		setLoading(true)
		try {
			const token = localStorage.getItem('jwtToken') || ''

			const formData = new FormData()
			formData.append('content', content)
			if (image) {
				formData.append('image', image)
			}

			const uniqueId = crypto.randomUUID ? crypto.randomUUID() : uuidv4()
			formData.append('id', uniqueId)

			await instance.post('/api/token/', formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			setContent('')
			setImage(null)
			setError(null)
			onPostCreated && onPostCreated()
		} catch (err: any) {
			// Обработка ошибок сервера с учётом структуры ответа
			const serverMessage =
				err.response?.data?.message ||
				err.response?.data?.error ||
				err.message ||
				'Ошибка сети'
			setError(serverMessage)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			sx={{
				bgcolor: 'rgba(255, 255, 255, 0.1)',
				borderRadius: 5,
				p: 2,
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				maxWidth: 725,
				height: 140,
				width: '100%',
				mb: 3,
				position: 'relative',
			}}
		>
			<TextField
				label='Что у вас нового?'
				multiline
				minRows={3}
				fullWidth
				value={content}
				onChange={handleContentChange}
				variant='outlined'
			/>

			<Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 2 }}>
				<label htmlFor='upload-photo'>
					<input
						accept='image/*'
						id='upload-photo'
						type='file'
						style={{ display: 'none' }}
						onChange={handleImageChange}
					/>
					<IconButton color='primary' component='span'>
						<PhotoCamera />
					</IconButton>
				</label>

				{image && (
					<Typography variant='body2' noWrap sx={{ maxWidth: 400 }}>
						{image.name}
					</Typography>
				)}
			</Stack>

			{imagePreview && (
				<Box
					component='img'
					src={imagePreview}
					alt='Preview'
					sx={{
						maxWidth: '100%',
						maxHeight: 200,
						borderRadius: 2,
						objectFit: 'contain',
						boxShadow: '0 0 8px rgba(0,0,0,0.1)',
					}}
				/>
			)}

			{error && (
				<Typography color='error' mb={2}>
					{error}
				</Typography>
			)}

			<Box sx={{ position: 'absolute', bottom: '-5px', right: '16px' }}>
				<Button
					type='submit'
					variant='contained'
					disabled={loading}
					size='medium'
					sx={{ minWidth: 210 }} // задаёт минимальную ширину кнопки
				>
					{loading ? (
						<CircularProgress size={24} color='inherit' />
					) : (
						'Опубликовать'
					)}
				</Button>
			</Box>
		</Box>
	)
}

export default CreatePost
