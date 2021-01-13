import React, { useEffect, useRef } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import { SIGN_IN_WITH_GOOGLE } from '../../lib/graphql/mutations';
import { GET_GOOGLE_AUTH_URL } from '../../lib/graphql/queries'
import { signInWithGoogle as SignInWithGoogleData, signInWithGoogleVariables } from '../../lib/graphql/mutations/SignInWithGoogle/__generated__/signInWithGoogle';
import { authUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/authUrl';
import Button from '@material-ui/core/Button';
import google_icon from '../../assets/google_logo.jpg';
import { useSetLoggedInUserId } from '../../hooks';
import { Backdroper } from '../Backdroper';

export const GoogleSignInButton = () => {
  const client = useApolloClient();
  const setLoggedInUserId = useSetLoggedInUserId();
  const [signInWithGoogle, { loading }] = useMutation<SignInWithGoogleData, signInWithGoogleVariables>(SIGN_IN_WITH_GOOGLE, {
    onCompleted: (data) => {
      if (data && data.signInWithGoogle.token) {
        setLoggedInUserId(data.signInWithGoogle.id);
        sessionStorage.setItem("token", data.signInWithGoogle.token);
        toast.success("Signed In Successfully", { autoClose: 2000 });
        window.location.href = "/";
      } else {
        sessionStorage.removeItem("token");
        toast.info("Signed Out Successfully", { autoClose: 2000 });
      }
    },
    onError: (error) => {
      toast.error(error.message, { autoClose: 2000 });
    }
  });

  const signInRef = useRef(signInWithGoogle);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    
    if (code) {
      signInRef.current({
        variables: {
          input: {
            code
          }
        }
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: GET_GOOGLE_AUTH_URL
      });

      if (data.authUrl.code) {
        window.location.href = data.authUrl.code;
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <Button 
        variant="outlined" 
        fullWidth
        color="primary"
        onClick={handleAuthorize}
      >
        <img 
          src={google_icon} 
          style={{ width: 20, height: 20 }} 
          alt="google icon" 
        /> 
        &nbsp; Sign in with Google
      </Button>
      <Backdroper open={loading} />
    </>
  )
}
