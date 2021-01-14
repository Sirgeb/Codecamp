import React from 'react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Breadcrumb, Meta, ForgotPasswordForm } from '../../components';

export const ForgotPasswordPage = () => {
  useScrollToTop();
  
  return (
    <div className="root-mt">
      <Meta title="Codecamp | Forgot Password" />
      <Breadcrumb 
        routes={[
          { name: "Forgot Password", path: "/forgot-password" }
        ]} 
      />
      <ForgotPasswordForm />
    </div>
  )
}
