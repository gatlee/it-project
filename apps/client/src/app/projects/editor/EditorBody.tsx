import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactMde, { Command, getDefaultToolbarCommands } from 'react-mde';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { generateCloudinaryUrl } from '../../cloudinaryUtility';
import { PlayFill } from 'react-bootstrap-icons';

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

    // Return true on a success
    return true;
  };

  const youtubeCommand: Command = {
    buttonProps: { 'aria-label': 'Add Youtube Embed' },
    icon: () => <PlayFill />,
    execute: (opts) => {
      const youtubeEmbed = `<div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/{ID-GOES-HERE}" allowfullscreen></iframe>
    </div>`;
      opts.textApi.replaceSelection(youtubeEmbed);
    },
  };

  const toolbarCommands = [...getDefaultToolbarCommands(), ['youtube-embed']];

  return (
    <Container fluid className="px-0 mx-0">
      <ReactMde
        commands={{
          'youtube-embed': youtubeCommand,
        }}
        toolbarCommands={toolbarCommands}
        value={props.content}
        onChange={props.onContentChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(
            <ReactMarkdown escapeHtml={false} source={markdown} />
          )
        }
        paste={{
          saveImage: saveImage,
        }}
      />
    </Container>
  );
};

export { EditorBody };
