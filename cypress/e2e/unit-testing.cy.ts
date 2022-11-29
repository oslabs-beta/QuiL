import createNodes from "../../app/Main/Chart/(flow)/Nodes";
import createEdges from "../../app/Main/Chart/(flow)/Edges";
import res from "../../app/Main/Chart/(flow)/dummyRes";
import { data } from 'cypress/types/jquery';

describe('unit test for application code', () => {
    context('Nodes.tsx', () => {
        const nodes = createNodes(res);
        const nodeKeys = ['id', 'type', 'position', 'data'];
        const dataKeys = ['name', 'key', 'columns', 'edges', 'refTables', 'arrFKeys']
        it('should test if each nodes array exists and has length', () => {
            expect(Array.isArray(nodes)).to.eq(true);
        });
        it('should test if each node has correct properties', () => {
            nodes.forEach(node => {
                expect(typeof node === 'object').to.eq(true)
                nodeKeys.forEach(key => {
                    expect(node.hasOwnProperty(key)).to.eq(true)
                })
            })
        })
        it('should test each property in each node has the correct value', () => {
            nodes.forEach(node => {
                expect(typeof node['id'] === 'string').to.eq(true)
                expect(node['type']).to.eq("tableNode")
                expect(node['position'].hasOwnProperty('x')).to.eq(true);
                expect(node['position'].hasOwnProperty('y')).to.eq(true);
                expect(node['data']).to.not.eq(null);
                expect(typeof node['data'] === 'object').to.eq(true)
            })
        })
        it('to see if data properties have the correct value', () => {
            nodes.forEach(node => {
                dataKeys.forEach(key => {
                    expect(node.data.hasOwnProperty(key)).to.eq(true);
                })
            })
        })
     })
    
     context('Edges.tsx', () => {
        const edges = createEdges(res)
        const edgeKeys = ['id', 'animated', 'style', 'source', 'type', 'sourceHandle', 'targetHandle', 'target'];
        
        it('if each nodes array exists and has length', () => {
            expect(Array.isArray(edges)).to.eq(true);
        });
    
        it('if each node is an object and has proper keys', () => {
            edges.forEach(edge => {
                expect(typeof edge === 'object').to.eq(true)
                edgeKeys.forEach(key => {
                    expect(edge.hasOwnProperty(key)).to.eq(true)
                })
            })
        })
     })
})