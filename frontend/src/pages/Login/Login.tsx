import React, { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useInput } from '../../hooks/useInput';
import { Watch } from 'react-loader-spinner';
import { unSetSucces } from '../../store/auth/authSlice';
import { loginUser } from '../../store/auth/async';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading, error, success, userToken, userInfo } = useAppSelector(
		(state) => state.auth
	);
	const password = useInput('', { isEmpty: true, minLength: 3, maxLength: 20 });
	const email = useInput('', { isEmpty: true, isEmail: true });
	const isDisabled = !email.inpuValid || !password.inpuValid;

	const loginPayload = {
		password: password.value,
		email: email.value,
	};

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [userInfo, navigate, dispatch]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(loginUser(loginPayload));
	}

	return (
		<div className='auth-wrapper'>
			{error && <div>{error}</div>}
			<form onSubmit={onSubmit} className='customForm'>
				<fieldset className='customFieldset'>
					<legend className='legend'>Login</legend>
					<Input
						value={email.value}
						type='email'
						labelText='Email'
						onChange={email.onChange}
						onBlur={email.onBlur}
						placeholder='Enter your email'
						inputName={email}
					/>
					<Input
						value={password.value}
						type='password'
						labelText='Password'
						onChange={password.onChange}
						onBlur={password.onBlur}
						placeholder='Enter you password'
						inputName={password}
					/>
				</fieldset>
				<div className='buttonsHolder'>
					<Button type='ok' disabled={isDisabled}>
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
