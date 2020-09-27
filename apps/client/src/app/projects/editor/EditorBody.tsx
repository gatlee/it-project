import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown/umd/react-markdown';

interface EditorBody {
  content: string;
  onContentChange: (content: string) => void;
}

//This is the markdown editor
const EditorBody = (props: EditorBody) => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  return (
    <Container fluid className="px-0 mx-0">
      <ReactMde
        value={props.content}
        onChange={props.onContentChange}
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
