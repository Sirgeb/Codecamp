import React from 'react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Breadcrumb, Backdroper, Meta, SignInForm } from '../../components';

export const SignInPage = () => {
  useScrollToTop();

  return (
    <div className="root-mt">
      <Meta title="Codecamp | Sign In" />
      <Breadcrumb 
        routes={[
          { name: "Sign In", path: "/login" }
        ]} 
      />
      <SignInForm />
      <Backdroper open={false} />
    </div>
  )
}
