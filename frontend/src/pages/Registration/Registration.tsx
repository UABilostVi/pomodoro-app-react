import React, { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../store/auth/async';

import { unSetSucces } from '../../store/auth/authSlice';
import { useInput } from '../../hooks/useInput';

const Registration: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading, error, success } = useAppSelector((state) => state.auth);
	const username = useInput('', { isEmpty: true, minLength: 3, maxLength: 30 });
	const password = useInput('', { isEmpty: true, minLength: 3, maxLength: 30 });
	const email = useInput('', { isEmpty: true, isEmail: true });

	const newUser = {
		username: username.value,
		password: password.value,
		email: email.value,
	};

	useEffect(() => {
		if (success) {
			dispatch(unSetSucces());
			navigate('/login');
		}
	}, [success, navigate, dispatch]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(registerUser(newUser));
	}

	return (
		<div className='auth-wrapper'>
			{loading && <h2>Loading...</h2>}
			<form onSubmit={onSubmit} className='customForm'>
				<fieldset className='customFieldset'>
					<legend className='legend'>Registration</legend>
					<Input
						value={username.value}
						type='text'
						labelText='Username'
						onChange={username.onChange}
						onBlur={username.onBlur}
						placeholder='Add username here'
					/>
					{username.isDirty && username.isEmpty && <div>Empty</div>}
					{username.isDirty && username.minLengthErr && <div>Min</div>}
					{username.isDirty && username.maxLengthErr && <div>Max</div>}
					<Input
						value={email.value}
						type='email'
						labelText='Email'
						onChange={email.onChange}
						onBlur={email.onBlur}
						placeholder='Add email here'
					/>
					{email.isDirty && email.isEmpty && <div>Empty mail</div>}
					{email.isDirty && email.emailErr && <div>Error mail</div>}
					<Input
						value={password.value}
						type='password'
						labelText='Password'
						onChange={password.onChange}
						onBlur={password.onBlur}
						placeholder='Add password here'
					/>
					{password.isDirty && password.isEmpty && <div>Empty</div>}
					{password.isDirty && password.minLengthErr && <div>Min</div>}
					{password.isDirty && password.maxLengthErr && <div>Max</div>}
				</fieldset>
				<Button
					type='save'
					disabled={
						!email.inpuValid || !password.inpuValid || !username.inpuValid
					}
				>
					Register
				</Button>
				<p>
					If you have an account you can <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
};

export default Registration;
