import React from 'react';
import Head from 'next/head';
import 'semantic-ui-css/semantic.css';
import projects from '../projects.json';

export default function ProjectPage({project}) {
  return <pre>{JSON.stringify(project, null, 2)}</pre>;
}

export async function getStaticProps(context) {
  const project = projects.find(
    p => p['Part No.'] === context.params.projectName,
  );
  return {
    props: {project},
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
