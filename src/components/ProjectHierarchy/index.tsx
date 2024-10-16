import { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import Node from "./Node";
import projects from "../../data/projects.json";
import { findUsersByProjectID } from "../../utils";
import orgData from "../../data/org.json";

function ProjectTree() {
    const [projectNode, setProjectNode] = useState<any>({});

    useEffect(() => {
        fetchProjectDetails();
    }, []);

    const fetchProjectDetails = () => {
        const projectsData: any = [];
        projects.forEach((p) => {
            const projUsers = findUsersByProjectID(p.id, orgData);
            const projNode = {
                ...p,
                collapsed: false,
                nestedData: projUsers,
            };
            projectsData.push(projNode);
        });

        setProjectNode({
            id: "P0000",
            name: "Digital Engeering",
            nestedData: projectsData,
        });
    };

    return <ProjectHierarchy projNode={projectNode} />;
}

function ProjectHierarchy({
    parent,
    projNode,
}: {
    parent?: any;
    projNode?: any;
}) {
    const [projectNode, setProjectNode] = useState<any>({});
    const [collapsed, setCollapsed] = useState(projectNode.collapsed || false);

    useEffect(() => {
        setProjectNode(projNode);
    }, [projNode]);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        setProjectNode((prev: any) => ({
            ...prev,
            collapsed,
        }));
    }, [collapsed]);

    const T = parent
        ? TreeNode
        : (props: React.ComponentProps<typeof Tree>) => (
              <Tree
                  {...props}
                  lineWidth={"2px"}
                  lineColor={"#bbc"}
                  lineBorderRadius={"12px"}
              >
                  {props.children}
              </Tree>
          );

    return (
        <>
            {collapsed ? (
                <T
                    className={collapsed ? "displayNone" : ""}
                    label={
                        <Node
                            data={projectNode}
                            onCollapse={() => handleCollapse()}
                            collapsed={collapsed}
                        />
                    }
                >
                    <></>
                </T>
            ) : (
                <T
                    className={collapsed ? "displayNone" : ""}
                    label={
                        <Node
                            data={projectNode}
                            onCollapse={() => handleCollapse()}
                            collapsed={collapsed}
                        />
                    }
                >
                    {projectNode?.nestedData?.map((p: any, index: number) => (
                        <ProjectHierarchy
                            key={index}
                            parent={projectNode}
                            projNode={p}
                        />
                    ))}
                </T>
            )}
        </>
    );
}

export default ProjectTree;
