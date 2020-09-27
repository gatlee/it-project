import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactMde from 'react-mde';
import * as ReactMarkdown from 'react-markdown/umd/react-markdown';

//This is the markdown editor
const EditorBody = () => {
  const [value, setValue] = useState('');
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  return (
    <Container fluid className="px-0 mx-0">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown source={markdown} />)
        }
      />
    </Container>
  );
};

export { EditorBody };
