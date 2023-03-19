import React, { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

const Login: FC = () => {
	let [email, setEmail] = useState<String>('');
	let [password, setPassword] = useState<String>('');
	// const dispatch = useDispatch();
	// const navigate = useNavigate();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(email, password);

		// dispatch(loginThunk({ email, password }, navCourses));
		// dispatch(getAuthors());
		// dispatch(getCourses());
	}

	// function navCourses() {
	// 	navigate('/courses');
	// }

	function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	return (
		<div className='auth-wrapper'>
			<form onSubmit={onSubmit} className='customForm'>
				<fieldset className='customFieldset'>
					<legend className='legend'>Login</legend>
					<Input
						type='email'
						placeholder='Enter your email'
						labelText='Email'
						onChange={onChangeEmail}
					/>
					<Input
						type='password'
						labelText='Password'
						onChange={onChangePassword}
						placeholder='Enter you password'
					/>
				</fieldset>
				<Button type='ok'>Login</Button>
				<p>
					If you don`t have an account you can{' '}
					<Link to='/registration'>Register</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
