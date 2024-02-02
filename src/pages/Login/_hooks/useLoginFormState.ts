import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '../../../schema/LoginSchema';
import { z } from 'zod';
import { useAuth } from '../../../composables/useAuth';

export default function useLoginFormState() {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>){
    // login user
    await login(data);
  }

  return {
    form,
    onSubmit
  }
}
