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
    let url = await generateCloudinaryUrl(new Blob([data]));

    // If a PDF has been uploaded, get Cloudinary to transform into a .png
    if (url.endsWith('.pdf')) {
      url = url.substring(0, url.length - 4) + '.png';
    }

    yield url;

    // Return true on a success
    return true;
  };

  const youtubeCommand: Command = {
    buttonProps: { 'aria-label': 'Add Youtube Embed' },
    icon: () => <PlayFill />,
    execute: (opts) => {
      const youtubeEmbed =
        `<div class="embed-responsive embed-responsive-16by9">\n` +
        ` <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/{ID-GOES-HERE}" allowfullscreen></iframe>\n` +
        `</div>`;

      opts.textApi.replaceSelection(youtubeEmbed);
    },
  };

  const editorImageStyle = {
    img: {
      maxWidth: '100%',
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
            <ReactMarkdown
              escapeHtml={false}
              source={markdown}
              css={editorImageStyle}
            />
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
