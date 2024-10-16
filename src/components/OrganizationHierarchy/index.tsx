import { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import Node from "./Node";
import { Employee } from "../../types";

interface EmployeeType extends Employee {
    collapsed?: boolean;
}

type NodeProps = {
    o: EmployeeType;
    parent?: Employee;
};

function Organization({ o, parent }: NodeProps) {
    const [collapsed, setCollapsed] = useState(o.collapsed || false);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        o.collapsed = collapsed;
    }, [collapsed, o]);

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

    return collapsed ? (
        <T
            label={
                <Node
                    org={o}
                    onCollapse={handleCollapse}
                    collapsed={collapsed}
                />
            }
        >
            <></>
        </T>
    ) : (
        <T
            label={
                <Node
                    org={o}
                    onCollapse={handleCollapse}
                    collapsed={collapsed}
                />
            }
        >
            {o?.reporties?.map((c, index) => (
                <Organization key={index} o={c} parent={o} />
            ))}
        </T>
    );
}

export default Organization;
