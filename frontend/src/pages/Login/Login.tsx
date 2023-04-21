import React, { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

import { loginUser } from '../../store/auth/async';
import { useNotification } from '../../components/Notification/NotificationProvider';
import useInput from '../../hooks/useInput';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const dispatchNotification = useNotification();
	const navigate = useNavigate();
	const { loading, error, success } = useAppSelector((state) => state.auth);
	const email = useInput('', { isEmail: true });
	const password = useInput('', { maxLength: 30, minLength: 3 });
	const isDisabled = email.error || password.error ? true : false;

	useEffect(() => {
		if (success) {
			navigate('/');
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

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(
			loginUser({
				email: email.value,
				password: password.value,
			})
		);
	}

	return (
		<div className='auth-wrapper'>
			<form onSubmit={onSubmit} className='customForm'>
				<fieldset className='customFieldset'>
					<legend className='legend'>Login</legend>
					<Input legendText='Email' error={email.error} isDirty={email.isDirty}>
						<input
							type='email'
							placeholder='Enter your email'
							value={email.value}
							onChange={(e) => email.onChange(e)}
							onBlur={() => email.onBlur()}
						/>
					</Input>
					<Input
						legendText='Password'
						error={password.error}
						isDirty={password.isDirty}
					>
						<input
							type='password'
							placeholder='Enter you password'
							value={password.value}
							onChange={(e) => password.onChange(e)}
							onBlur={() => password.onBlur()}
						/>
					</Input>
				</fieldset>
				<div className='buttonsHolder'>
					<Button buttonType='submit' customType='ok' disabled={isDisabled}>
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
