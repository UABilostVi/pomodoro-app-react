import React, { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Watch } from 'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

import { loginUser } from '../../store/auth/async';
import { useNotification } from '../../components/Notification/NotificationProvider';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const dispatchNotification = useNotification();
	const navigate = useNavigate();
	const { loading, error, userInfo } = useAppSelector((state) => state.auth);

	type FormValues = {
		email: string;
		password: string;
	};

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [userInfo]);

	useEffect(() => {
		if (error) {
			dispatchNotification({
				type: 'error',
				message: error,
			});
		}
	}, [error]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: 'onBlur' });

	const onSubmit: SubmitHandler<FormValues> = (data) =>
		dispatch(loginUser(data));

	return (
		<div className='auth-wrapper'>
			<form onSubmit={handleSubmit(onSubmit)} className='customForm'>
				<fieldset className='customFieldset'>
					<legend className='legend'>Login</legend>
					<Input legendText='Email' error={errors.email}>
						<input
							type='email'
							placeholder='Enter your email'
							{...register('email', {
								required: 'Must be filled',
								pattern: {
									value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
									message: 'Invalid e-mail format',
								},
							})}
						/>
					</Input>
					<Input legendText='Password' error={errors.password}>
						<input
							type='password'
							placeholder='Enter you password'
							{...register('password', {
								required: 'Must be filled',
								minLength: {
									value: 3,
									message: 'Min length 3',
								},
								maxLength: {
									value: 30,
									message: 'Max length 30',
								},
							})}
						/>
					</Input>
				</fieldset>
				<div className='buttonsHolder'>
					<Button buttonType='submit' customType='ok' disabled={!isValid}>
						{!loading && 'Login'}
						{loading && (
							<Watch wrapperClass='loader' color='white' height={24} />
						)}
					</Button>
				</div>
				<p>
					If you don`t have an account you can{' '}
					<Link to='/registration'>Register</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
