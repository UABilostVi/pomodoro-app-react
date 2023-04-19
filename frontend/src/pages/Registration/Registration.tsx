import { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { useNotification } from '../../components/Notification/NotificationProvider';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../store/auth/async';
import { unSetSucces } from '../../store/auth/authSlice';
import useInput from '../../hooks/useInput';

const Registration: FC = () => {
	const dispatch = useAppDispatch();
	const dispatchNotification = useNotification();
	const navigate = useNavigate();
	const { loading, error, success } = useAppSelector((state) => state.auth);

	const username = useInput('', { maxLength: 30, minLength: 3 });
	const email = useInput('', { isEmail: true });
	const password = useInput('', { maxLength: 30, minLength: 3 });
	const isDisabled =
		email.error || password.error || username.error ? true : false;

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

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(
			registerUser({
				username: username.value,
				email: email.value,
				password: password.value,
			})
		);
	}

	return (
		<div className='auth-wrapper'>
			<form onSubmit={onSubmit} className='customForm'>
				<fieldset className='customFieldset'>
					<legend className='legend'>Registration</legend>
					<Input
						legendText='Username'
						error={username.error}
						isDirty={username.isDirty}
					>
						<input
							type='text'
							placeholder='Add username here'
							value={username.value}
							onChange={(e) => username.onChange(e)}
							onBlur={() => username.onBlur()}
						/>
					</Input>
					<Input legendText='Email' error={email.error} isDirty={email.isDirty}>
						<input
							type='email'
							placeholder='Add email here'
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
							placeholder='Add password here'
							value={password.value}
							onChange={(e) => password.onChange(e)}
							onBlur={() => password.onBlur()}
						/>
					</Input>
				</fieldset>
				<div className='buttonsHolder'>
					<Button buttonType='submit' customType='save' disabled={isDisabled}>
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
