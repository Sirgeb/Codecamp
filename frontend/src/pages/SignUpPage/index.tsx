import React from 'react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Breadcrumb, Meta, SignUpForm } from '../../components';

export const SignUpPage = () => {
  useScrollToTop();

  return (
    <div className="root-mt">
      <Meta title="Codecamp | Sign Up" />
      <Breadcrumb 
        routes={[
          { name: "Sign Up", path: "/signup" }
        ]}
      />
      <SignUpForm />
    </div>
  )
}
