import * as React from 'react';
interface CustomScriptProps
  extends React.ScriptHTMLAttributes<HTMLScriptElement> {
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
}

const CustomScript: React.FC<CustomScriptProps> = ({strategy, ...props}) => {
  return <script {...props} />;
};

export default CustomScript;
