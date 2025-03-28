import { useState } from "react";

import { LoginFormData } from "@/types/LoginFormData";
import { Field, Fieldset, Form, Input } from "@base-ui-components/react";


type LoginProps = {
  doLogin: (LoginFormData: LoginFormData) => void;
};

export default function Login({ doLogin }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    doLogin(formData);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} name="loginForm">
        <Fieldset.Root>
          <Fieldset.Legend>Log in to continue</Fieldset.Legend>
          <Field.Root>
            <Input
              name="name"
              placeholder="Name"
              autoComplete="firstname"
              value={formData.name}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Input
              name="email"
              placeholder="Email"
              autoComplete="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Field.Root>
          <button type="submit">Login</button>
        </Fieldset.Root>
      </Form>
    </div>
  );
}
