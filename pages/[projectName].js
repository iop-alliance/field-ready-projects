import React from 'react';
import Head from 'next/head';
import {Container, Header} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';
import projects from '../projects.json';

export default function ProjectPage({project}) {
  const partNo = project['Part No.'];
  project = {...project, 'Part No.': undefined};
  const name = project['Name'].trim();
  project = {...project, Name: undefined};
  const description = project['Description'];
  project = {...project, Description: undefined};
  const images = {
    cad: project['CAD Image'],
    in_use: project['In use Image'],
    catalogue: project['Catalogue Image'],
  };
  project = {
    ...project,
    'CAD Image': undefined,
    'In use Image': undefined,
    'Catalogue Image': undefined,
    thumbnail: undefined,
  };
  const cad = project['CAD'];
  project = {...project, CAD: undefined};
  return (
    <Container>
      <Header as="h1">{name}</Header>
      <pre>{JSON.stringify(project, null, 2)}</pre>
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
