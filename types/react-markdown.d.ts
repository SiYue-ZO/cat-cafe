declare module 'react-markdown' {
  import * as React from 'react';
  const ReactMarkdown: React.ComponentType<any>;
  export default ReactMarkdown;
}

declare module 'remark-gfm' {
  const plugin: any;
  export default plugin;
}

declare module 'rehype-sanitize' {
  const plugin: any;
  export default plugin;
}
