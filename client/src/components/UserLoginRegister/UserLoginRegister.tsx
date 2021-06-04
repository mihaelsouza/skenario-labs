import './UserLoginRegister.css';
import React, { useState } from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { closeModal } from '../../redux/modalSlice';
import { updateUser } from '../../redux/usersSlice';

import { createUser, getUser } from '../../services/ServerService';
import { User } from '../../interfaces/User';

interface Form {
  [key: string]: string;
  username: string;
  email: string;
  password: string;
}

const formInitialState = {
  username: '',
  email: '',
  password: '',
};

const UserLoginRegister: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [form, setForm] = useState<Form>(formInitialState);

  const handleError = (errorMessage: string) => {
    const errorField = document.getElementById('form-error');
    if (errorField) errorField.textContent = errorMessage;
    else alert(errorMessage);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      let user: User;
      if (isLogin && form.email !== '' && form.password !== '') {
        user = await getUser(form.email, form.password);
      } else if (!isLogin && Object.values(form).indexOf('') === -1) {
        user = await createUser({userId: 0, ...form});
      } else {
        handleError('All fields are required!');
        return;
      }

      localStorage.setItem('sklabs-propertyviewer-userdata', JSON.stringify(user));
      dispatch(updateUser(user));
      dispatch(closeModal());
    } catch (e) {
      handleError(e);
    }
  };

  const handleFormUpdate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target: keyof Form = event.target.name;
    const value: string = event.target.value;
    const newForm = {...form};
    newForm[target] = value;

    setForm({...newForm});
  };

  const handleLoginOrRegister = (): void => {
    setIsLogin(!isLogin);
  };

  const handleReset = (): void => {
    setForm({...formInitialState});
  };

  return (
    <div>
      <h1>Welcome to Property Viewer!</h1>
      <h3>Before moving on, please log in.</h3>
      {isLogin ? (
        <form className="form-style" onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor="email">
            E-mail:
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => handleFormUpdate(event)}
            ></input>
          </label>
          <label htmlFor="email">
            Password:
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(event) => handleFormUpdate(event)}
            ></input>
          </label>
          <button className="form-toggle" onClick={handleLoginOrRegister}>
            Not registered? Create an account!
          </button>
          <p id="form-error"></p>
          <div className="user-form-btn">
            <input type="reset" value="Clear" onClick={handleReset}></input>
            <input type="submit" value="Log In"></input>
          </div>
        </form>
      ) : (
        <form className="form-style" onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor="username">
            Username:
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={(event) => handleFormUpdate(event)}
            ></input>
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => handleFormUpdate(event)}
            ></input>
          </label>
          <label htmlFor="email">
            Password:
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(event) => handleFormUpdate(event)}
            ></input>
          </label>
          <button className="form-toggle" onClick={handleLoginOrRegister}>
            Already have an account? Sign in!
          </button>
          <p id="form-error"></p>
          <div className="user-form-btn">
            <input type="reset" value="Clear" onClick={handleReset}></input>
            <input type="submit" value="Register"></input>
          </div>
        </form>
      )}
    </div>
  )
};

export default UserLoginRegister;
