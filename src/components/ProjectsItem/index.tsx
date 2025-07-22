import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import config from '../../../scripts/config.json';

export interface ProjectItemProps {
    name: string;
    description: string;
    color: string;
    logoUrl: string;
    githubUrl: string;
    websiteUrl: string;
    metricsUrl: string;
}

export default function ProjectItem(item: ProjectItemProps) {
    return (
        <section className={clsx(styles.projectItem)} style={{border: `0.8rem solid ${item.color}`}}>
            <div>
                <h1><img src={config.githubConfig.baseURL + item.logoUrl}/></h1>
                <hr/>
                <h3 style={{textAlign:'left'}}>{item.name}</h3>
                <p>{item.description}</p>
                <div className={clsx(styles.projectLinks)}>
                    <a target="_blank" href={item.githubUrl}>GitHub<span> &gt;</span></a>
                    <a target="_blank" href={item.websiteUrl}>Website<span> &gt;</span></a>
                </div>
            </div>
        </section>
    );
}
