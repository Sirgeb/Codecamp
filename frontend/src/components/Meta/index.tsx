import React from 'react'
import { Helmet } from 'react-helmet';

interface Props {
  title: string;
  description: string;
  keywords: string;
}

export const Meta = ({ title, description, keywords }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Codecamp | Home',
  description: 'Get tech bootcamps to kick-start your journey in tech',
  keywords: 'Get bootcamps, bootcamps, tech bootcamps, codecamp, coding, learn coding',
}
