import React from 'react';
import Link from 'next/link';
import {Card} from 'semantic-ui-react';
import {LazyLoadImage} from 'react-lazy-load-image-component';

const ProjectCard = ({project}) => {
  let description = project.description || '';
  if (description.length > 140) {
    description = description.slice(0, 140) + '...';
  }

  return (
    <Link href={project['documentation-home']} passHref>
      <Card style={{margin: 20}} key={project.id} as="a">
        <div
          style={{
            width: 290,
            height: 200,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}>
          <LazyLoadImage src={project.image || '/images/placeholder.png'} />
        </div>
        <Card.Content>
          <Card.Header
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {project.title}
          </Card.Header>
          <Card.Meta
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {project.id}
          </Card.Meta>
          <Card.Description
            style={{
              maxHeight: '10em',
              overflow: 'hidden',
            }}>
            {description}
          </Card.Description>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default ProjectCard;
