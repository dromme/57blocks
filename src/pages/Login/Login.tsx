import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';
import styles from './Login.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage, STATE_KEYS } from '@/utils/LocalStorage';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' })
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage(STATE_KEYS.USERNAME)

  useEffect(() => {
    if (!!username) {
      navigate('/')
    }
  }, [username])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(old => ({
      ...old,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(form.username);
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome!</h1>
      <span className={styles.subtitle}>To this really dummy login</span>
      <Form onSubmit={handleSubmit}>
        <TextField name="username" isRequired>
          <Label>Username</Label>
          <Input onChange={handleChange} />
          <FieldError />
        </TextField>
        <TextField name="password" type="password" isRequired>
          <Label>Password</Label>
          <Input onChange={handleChange} />
          <FieldError />
        </TextField>
        <div>
          <Button type="submit">let's start</Button>
        </div>
      </Form>
    </div >
  )
}

export default Login;
