import React, { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../store/auth/async';
import { unSetSucces } from '../../store/auth/authSlice';

import { useInput } from '../../hooks/useInput';

const Registration: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading, error, success, userInfo } = useAppSelector(
		(state) => state.auth
	); //FIXME decide what to do with err from server
	const username = useInput('', { isEmpty: true, minLength: 3, maxLength: 20 });
	const password = useInput('', { isEmpty: true, minLength: 3, maxLength: 20 });
	const email = useInput('', { isEmpty: true, isEmail: true });
	const isDisabled =
		!email.inpuValid || !password.inpuValid || !username.inpuValid;

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

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [userInfo, navigate, dispatch]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(registerUser(newUser));
	}

	return (
		<div className='auth-wrapper'>
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
						inputName={username}
					/>
					<Input
						value={email.value}
						type='email'
						labelText='Email'
						onChange={email.onChange}
						onBlur={email.onBlur}
						placeholder='Add email here'
						inputName={email}
					/>
					<Input
						value={password.value}
						type='password'
						labelText='Password'
						onChange={password.onChange}
						onBlur={password.onBlur}
						placeholder='Add password here'
						inputName={password}
					/>
				</fieldset>
				<div className='buttonsHolder'>
					<Button type='save' disabled={isDisabled}>
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
