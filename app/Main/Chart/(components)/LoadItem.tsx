import { any } from 'cypress/types/bluebird';
import React from 'react'
import { projectType } from '../../../(root)/frontendTypes';

type LoadItemProps = {
    userProject: projectType
    key: string
    id: string
}

function LoadItem(
    {userProject, key, id}: LoadItemProps) {

    const remove = (el: any) => {
        let element = el;
        element.remove();
    }

    const deleteURIHandler = async (id: number): Promise<void> => {
        let data = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `mutation {
                    deleteProject(projectId: $projectId) {
                      deleted
                    }
                  }
                `
            })
        })
        .then((data) => {
            return data.json();
        })
    }
  return (
    <tr id={userProject._id}>
        <th>{key}</th>
        <td>{userProject.name}</td>
        <td>{userProject.saved_db}</td>
        <button onClick={(e: any) => deleteURIHandler(e.target.id)}>X</button>
    </tr>
  )
}

export default LoadItem