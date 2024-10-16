import { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import Node from "./Node";
import projects from "../../data/projects.json";
import { findUsersByProjectID } from "../../utils";
import orgData from "../../data/org.json";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Project } from "../../types";

function ProjectTree() {
    const [projectId, setProjectId] = useState<string>("");
    const [projectNode, setProjectNode] = useState<any>({});
    const [allProjects, setAllProjects] = useState<Project[]>([]);

    useEffect(() => {
        const id = projects?.[0].id;
        fetchProjectDetails(id);
        setProjectId(projects?.[0].id);
        setAllProjects(projects);
    }, []);

    useEffect(() => {
        fetchProjectDetails(projectId);
    }, [projectId]);

    const fetchProjectDetails = (id: string) => {
        const proj = projects.find((p) => p.id === id);
        const projUsers = findUsersByProjectID(id, orgData);

        const projNode = {
            ...proj,
            collapsed: false,
            users: projUsers,
        };
        setProjectNode(projNode);
    };

    return (
        <>
            <FormControl
                sx={{
                    position: "fixed",
                    top: "20px",
                    left: "20px",
                    minWidth: "300px",
                }}
            >
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={projectId}
                    label="Project"
                    onChange={(e) => setProjectId(e.target.value)}
                >
                    {allProjects.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                            {p.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <ProjectHierarchy projNode={projectNode} />
        </>
    );
}

function ProjectHierarchy({
    parent,
    user,
    projNode,
}: {
    user?: any;
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
                    label={
                        <Node
                            project={projectNode}
                            onCollapse={() => handleCollapse()}
                            collapsed={collapsed}
                            user={user}
                        />
                    }
                >
                    <></>
                </T>
            ) : (
                <T
                    label={
                        <Node
                            project={projectNode}
                            onCollapse={() => handleCollapse()}
                            collapsed={collapsed}
                            user={user}
                        />
                    }
                >
                    {projectNode?.users?.map((u: any, index: number) => (
                        <ProjectHierarchy
                            key={index}
                            user={u}
                            parent={projectNode}
                        />
                    ))}
                </T>
            )}
        </>
    );
}

export default ProjectTree;
