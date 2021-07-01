import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {Container, Header, Divider} from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import 'semantic-ui-css/semantic.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import projects from '../projects.json';

export default function ProjectPage({project}) {
  const partNo = project['Part No.']?.trim();
  const name = project['Name']?.trim();
  const description = project['Description']?.trim();
  const images = project['images']
  const cadFiles = project['CAD'];
  const drawings = project['Eng Dwg'];
  return (
    <Container style={{marginTop: 50}}>
      <div className="back">
        <Link href="/">Projects</Link>
        <span>{' >'}</span>
      </div>
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
          <Divider />
          <div className="files">
            <Header as="h3">CAD Files</Header>
            <ul>
              {cadFiles.map(f => (
                <li key={f.filename}>
                  <a href={f.url}>{f.filename}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="files">
            <Header as="h3">Engineering Drawings</Header>
            <ul>
              {drawings.map(f => (
                <li key={f.filename}>
                  <a href={f.url}>{f.filename}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <ImageGallery showPlayButton={false} items={images} />
        </div>
      </div>
      <details>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </details>
      <style jsx>{`
        .back {
          font-size: 19pt;
        }
        .main {
          max-width: 1200px;
          display: flex;
        }
        .left {
          padding: 20px;
          width: 50%;
        }
        .right {
          width: 50%;
        }
        .files {
          margin-top: 20px;
        }
        @media (max-width: 800px) {
          .main {
            flex-wrap: wrap;
          }
          .left {
            width: 100%;
          }
          .right {
            width: 100%;
          }
        }
      `}</style>
    </Container>
  );
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
