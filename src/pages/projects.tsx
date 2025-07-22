import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from "@docusaurus/core/lib/client/exports/BrowserOnly";
import projectsList from '../../i18n/projects.json'
import type {ProjectItemProps} from '../components/ProjectsItem';

import styles from './projects.module.css';
import ProjectItem from "../components/ProjectsItem";

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    const colorList = ['#6e1981', '#e18a3b', '#4f6f46',
        '#3271ae', '#007175', '#c82c3f',
        '#662b1f', '#2e59a7', '#8f1d22', '#602641',];
    projectsList.forEach((project: ProjectItemProps, index: number) => {
        project.color = colorList[index % colorList.length];
    })

    const [projects, setProjects] = React.useState(projectsList as ProjectItemProps[]);
    const searchProject = (event: any) => {
        const search = event.target.value.toLowerCase();
        const filteredProjects = projectsList.filter((project: ProjectItemProps) => {
            return project.name.toLowerCase().includes(search) || project.description.toLowerCase().includes(search);
        });
        setProjects(filteredProjects as ProjectItemProps[]);
    }
    return (
        <Layout
            description="Open Source">
            <div className={clsx(styles.banner)}>
                <div>
                    <h1>Projects</h1>
                </div>
                <div>
                    <input onInput={searchProject} autoFocus placeholder="Search Projects"/>
                </div>
            </div>
            <main className={clsx(styles.projectsList)}>
                {projects.map((project: ProjectItemProps,index) => (
                    <ProjectItem key={index} {...project} />
                ))}
                {projects.length === 0 && <h1>No projects found</h1>}
            </main>
            <br/><br/>
        </Layout>
    );
}
