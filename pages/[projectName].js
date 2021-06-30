import React from 'react';
import Head from 'next/head';
import {Container, Header} from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import 'semantic-ui-css/semantic.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import projects from '../projects.json';

export default function ProjectPage({project}) {
  const partNo = project['Part No.']?.trim();
  const name = project['Name']?.trim();
  const description = project['Description']?.trim();
  const images = [
    ...project['Catalogue Image'],
    ...project['In use Image'],
    ...project['CAD Image'],
  ].map(({url, thumbnails}) => {
    return {
      original: url,
      thumbnail: thumbnails?.large?.url,
      fullscreen: url,
      fullscreenHeight: 'inherit',
    };
  });
  project = {
    ...project,
    'CAD Image': undefined,
    'In use Image': undefined,
    'Catalogue Image': undefined,
    thumbnail: undefined,
  };
  const cadFiles = project['CAD'];
  const drawings = project['Eng Dwg'];
  return (
    <Container style={{marginTop: 50}}>
      <div className="main">
        <div className="left">
          <Header as="h1">
            {name}
            <Header
              sub
              style={{fontSize: 19, fontStyle: 'italic', color: 'grey'}}>
              {partNo}
            </Header>
          </Header>
          <div style={{fontSize: 19}}>{description}</div>
        </div>
        <div className="right">
          <ImageGallery showPlayButton={false} items={images} />
        </div>
      </div>
      <pre>{JSON.stringify({}, null, 2)}</pre>
      <style jsx>{`
        .main {
          max-width: 1200px;
          display: flex;
        }
        @media (max-width: 800px) {
          .main {
            flex-wrap: wrap;
          }
        }
        .left {
          padding: 20px;
        }
        .right {
        }
      `}</style>
    </Container>
  );
}

function pop(obj, key) {
  const x = obj[key];
  obj = {...obj, [key]: undefined};
  return [x, obj];
}

export async function getStaticProps(context) {
  const project = projects.find(
    p => p['Part No.'] === context.params.projectName,
  );
  return {
    props: {project: JSON.parse(JSON.stringify(project))},
  };
}

export async function getStaticPaths() {
  const paths = projects.map(project => ({
    params: {projectName: project['Part No.']},
  }));
  return {
    paths,
    fallback: false,
  };
}
