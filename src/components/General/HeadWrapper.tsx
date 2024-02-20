import React, { useEffect } from 'react'

interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function HeadWrapper(props: Props) {
  useEffect(() => {
    document.title = props.title || 'Lead';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', props.description || 'Lead Management System');
    }
  }, [props.title, props.description]);
  return (
    <>
      {props.children}
    </>
  )
}
