import { Button, Group, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignin } from "../hooks/auth-hook";
import useStore from "../store/store";
import { PasswordStrength } from "./PasswordInput";
import clsx from "clsx";

const LoginForm = ({ toast, isSignin, setFormClose, toggle }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  const { signIn } = useStore();
  const { data, isSuccess, mutate } = useSignin(toast, toggle);
  const [strength, setStrength] = useState(0);
  const [passValue, setPassValue] = useInputState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    setFormClose(true);

    mutate({
      ...values,
      password: passValue,
    });

    if (isSuccess) {
      setFormClose(false);
      setTimeout(() => {
        signIn(data);
        navigate("/dashboard");
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className='flex flex-col gap-4'
    >
      <TextInput
        withAsterisk
        label='Email Address'
        placeholder='your@email.com'
        {...form.getInputProps("email")}
      />

      <PasswordStrength
        value={passValue}
        setValue={setPassValue}
        setStrength={setStrength}
        isSignin={true}
      />

      <Group
        className={clsx(
          "w-full flex",
          isSignin ? "justify-end" : " justify-between"
        )}
        mt='md'
      >
        <Button
          type='submit'
          className={clsx(theme ? "bg-blue-600" : "bg-black")}
        >
          Login
        </Button>
      </Group>
   
    </form>
  );
};

export default LoginForm;
