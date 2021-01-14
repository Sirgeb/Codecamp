import React from 'react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Breadcrumb, Meta, ChangePasswordForm } from '../../components';

export const ChangePasswordPage = () => {
  useScrollToTop();

  return (
    <div className="root-mt">
      <Meta title="Codecamp | Change Password" />
      <Breadcrumb 
        routes={[
          { name: "Change Password", path: "/change-password" }
        ]} 
      />
      <ChangePasswordForm />
    </div>
  )
}
