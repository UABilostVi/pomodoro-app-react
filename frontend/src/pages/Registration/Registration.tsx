import React, { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { useNotification } from '../../components/Notification/NotificationProvider';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../store/auth/async';
import { unSetSucces } from '../../store/auth/authSlice';

const Registration: FC = () => {
	const dispatch = useAppDispatch();
	const dispatchNotification = useNotification();
	const navigate = useNavigate();
	const { loading, error, success } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (success) {
			dispatch(unSetSucces());
			navigate('/login');
		}
	}, [success]);

	useEffect(() => {
		if (error) {
			dispatchNotification({
				type: 'error',
				message: error,
			});
		}
	}, [error]);

	type FormValues = {
		username: string;
		email: string;
		password: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: 'onBlur' });

	const onSubmit: SubmitHandler<FormValues> = (data) =>
		dispatch(registerUser(data));

	return (
		<div className='auth-wrapper'>
			<form onSubmit={handleSubmit(onSubmit)} className='customForm'>
				<fieldset className='customFieldset'>
					<legend className='legend'>Registration</legend>
					<Input
						type='text'
						labelText='Username'
						placeholder='Add username here'
						error={errors.username}
						register={register}
						registerData={[
							'username',
							{
								required: 'Must be filled',
								minLength: {
									value: 3,
									message: 'Min length 3',
								},
								maxLength: {
									value: 30,
									message: 'Max length 30',
								},
							},
						]}
					/>
					<Input
						type='email'
						labelText='Email'
						placeholder='Add email here'
						error={errors.email}
						register={register}
						registerData={[
							'email',
							{
								required: 'Must be filled',
								pattern: {
									value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
									message: 'Invalid e-mail format',
								},
							},
						]}
					/>
					<Input
						type='password'
						labelText='Password'
						placeholder='Add password here'
						error={errors.password}
						register={register}
						registerData={[
							'password',
							{
								required: 'Must be filled',
								minLength: {
									value: 3,
									message: 'Min length 3',
								},
								maxLength: {
									value: 30,
									message: 'Max length 30',
								},
							},
						]}
					/>
				</fieldset>
				<div className='buttonsHolder'>
					<Button type='save' disabled={!isValid}>
						{!loading && 'Register'}
						{loading && (
							<Watch wrapperClass='loader' color='white' height={24} />
						)}
					</Button>
				</div>
				<p>
					If you have an account you can <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
};

export default Registration;
