import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactMde, { Command, getDefaultToolbarCommands } from 'react-mde';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { generateCloudinaryUrls } from '../../cloudinaryUtility';
import { PlayFill } from 'react-bootstrap-icons';

interface EditorBody {
  content: string;
  onContentChange: (content: string) => void;
}

//This is the markdown editor
const EditorBody = (props: EditorBody) => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  // Converts a pdf url into into a .png url of a particular page
  const linkParser = (page: number, url: string) => {
    const secondLastSlashIndex = url.lastIndexOf('/', url.lastIndexOf('/') - 1);
    const pagedUrl =
      url.substring(0, secondLastSlashIndex) +
      `/pg_${page}` +
      url.substring(secondLastSlashIndex);
    const pngUrl = pagedUrl.substring(0, pagedUrl.length - 4) + '.png';

    console.log(pngUrl);
    return pngUrl;
  };

  const saveImage = async function* (
    data: ArrayBuffer
  ): AsyncGenerator<string, boolean, void> {
    const response = await generateCloudinaryUrls(new Blob([data]));
    const url = response.url;

    // This is really bastardised, but like no customisation of React Markdown Editor to be able to replace all text
    let fillText = '';
    // If a PDF has been uploaded, get Cloudinary to transform all pages into pngs
    if (url.endsWith('.pdf')) {
      // Single page, just yield it
      if (response.pages === 1) {
        fillText = linkParser(1, url);
        yield fillText;
      }

      // Otherwise gotta disgustingly fill this text in
      let i = 1;
      fillText += linkParser(i, url) + ')\n';
      while (i !== response.pages) {
        fillText += `![image](${linkParser(i, url)})\n`;
        i++;
      }

      // Last one so don't add the final bracket
      fillText += `![image](${linkParser(i, url)}`;
      yield fillText;
    } else {
      // Just a image so just yield the url
      yield url;
    }

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
