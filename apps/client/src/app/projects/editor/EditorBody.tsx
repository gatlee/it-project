import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { generateCloudinaryUrl } from '../../cloudinaryUtility';

interface EditorBody {
  content: string;
  onContentChange: (content: string) => void;
}

//This is the markdown editor
const EditorBody = (props: EditorBody) => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const saveImage = async function* (
    data: ArrayBuffer
  ): AsyncGenerator<string, boolean, void> {
    const url = await generateCloudinaryUrl(new Blob([data]));
    yield url;
    return true;
  };

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
        paste={{
          saveImage: saveImage,
        }}
      />
    </Container>
  );
};

export { EditorBody };
