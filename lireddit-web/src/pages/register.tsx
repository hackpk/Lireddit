import { Button, Box } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toErrMap } from '../utils/errors';
import {useRouter} from 'next/router';

interface registerProps{

}

// const REGISTER_MUT= `
// mutation Register($username:String,$password:String){
//   register(options:{username:$username,password:$password}){
//     errors{
//       field
//       message
//     }
//     user{
//       id
//       username
//     }
//   }
// }
// `
const Register: React.FC<registerProps>= ({}) => {
  //const [,register] = useMutation(REGISTER_MUT);
  const router = useRouter();
  const [,register] = useRegisterMutation();
    return (
    <Wrapper variant="small">
      <Formik initialValues ={{username:"",password:""}} 
        onSubmit={async (values,{setErrors})=>{
        const response = await register(values);
        if(response.data?.register.errors){
          setErrors(toErrMap(response.data.register.errors));
        }else if(response.data?.register.user){
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
              <Button mt={3} type ="submit" colorScheme = "teal" isLoading ={isSubmitting}>register</Button>
            </Form>
    
          )}
      </Formik>
    </Wrapper>
    );
}

export default Register;