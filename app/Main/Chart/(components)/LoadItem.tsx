import { any } from 'cypress/types/bluebird';
import React, { useState } from 'react';
import { projectType } from '../../../(root)/frontendTypes';

type LoadItemProps = {
  userProject: projectType;
  key: string;
  id: string;
  uriLaunch: Function;
  setLoadVisibility: Function;
  setLoadModalVisible: Function;
  removeDeletedProject: Function;
};

function LoadItem({
  userProject,
  key,
  id,
  uriLaunch,
  setLoadVisibility,
  setLoadModalVisible,
  removeDeletedProject,
}: LoadItemProps) {
  const [projectVisibility, setProjectVisibility] = useState<boolean>(true);
  const remove = (el: any) => {
    let element = el;
    element.remove();
  };

  const deleteURIHandler = async (id: any): Promise<void> => {
    let data = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
                    deleteProject(projectId: ${id}) {
                      deleted
                    }
                  }
                `,
      }),
    }).then(data => {
      return data.json();
    });
    setProjectVisibility(false);
  };

  const handleLoadClick = (e: any, uri: any) => {
    setLoadModalVisible(false);
    uriLaunch(e, uri);
  };

  return (
    <>
      {projectVisibility && (
        <tr>
          <th>{key}</th>
          <td>{userProject.name}</td>
          <td>
            <button
              className="btn btn-success btn-outline btn-sm"
              type="submit"
              onClick={e => handleLoadClick(e, userProject.saved_db)}
            >
              Load
            </button>
          </td>
          <td>
            <button
              id={`${userProject._id}`}
              className="btn btn-error btn-outline btn-sm bg-red"
              onClick={(e: any) => {
                deleteURIHandler(e.target.id);
              }}
            >
              delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default LoadItem;
