import { Button, Box } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { toErrMap } from '../utils/errors';


const Login: React.FC<{}>= ({}) => {
    const router = useRouter();
    const [,login] = useLoginMutation();
    return (
    <Wrapper variant="small">
      <Formik initialValues ={{username:"",password:""}} 
        onSubmit={async (values,{setErrors})=>{
        const response = await login({options:values,});
        if(response.data?.login.errors){
          setErrors(toErrMap(response.data.login.errors));
        }else if(response.data?.login.user){
          router.push('/');
        }
      }}>
          {({isSubmitting}) => (
            <Form>
              <InputField
                name="username"
                placeholder= "username"
                label="Username"
              />
              <Box mt ={4}>
                <InputField
                  name="password"
                  placeholder= "password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button mt={3} type ="submit" colorScheme = "teal" isLoading ={isSubmitting}>login</Button>
            </Form>
          )}
      </Formik>
    </Wrapper>
    );
}

export default Login;