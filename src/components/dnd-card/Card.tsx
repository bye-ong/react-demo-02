import React, { useRef, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord, Identifier, DragDropMonitor } from 'dnd-core';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { monitorEventLoopDelay } from 'perf_hooks';

import { motion } from 'framer-motion';

export const ItemTypes = {
    CARD: 'card',
};

interface CardProp {
    id: any;
    text: string;
    index: number;
    backgroundColor: string;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    findCard: (id: string) => { index: number };
}

interface DragItem {
    index: number;
    id: string;
}

const CardElement = styled(motion.div)`
    width: 10%;
    height: 100px;
    color: #ffffff;
    text-shadow: -1px 0 black, 1px 0 black, 0 1px black, 0px -1px black;
    background: ${(prop) => prop.backgroundColor};
    opacity: ${(prop) => (prop.isDragging ? 0.3 : 1)};
    margin: 0 10px;
    padding: 5px 5px;
    white-space: normal;
    word-break: break-all;
`;

export const Card: React.FC<CardProp> = ({
    id,
    text,
    index,
    backgroundColor,
    moveCard,
    findCard,
}: any) => {
    const ref = useRef<HTMLDivElement>(null);

    const throttleHoverItem = throttle(
        (monitor: DragDropMonitor, item: DragItem, index: number) => {
            if (!ref.current) return;
            if (item.index === index) return;

            const hoverBoundingRect = ref.current!.getBoundingClientRect();

            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const hoverClientLeft =
                (clientOffset as XYCoord).x - hoverBoundingRect.left;
            const hoverClientRight =
                (clientOffset as XYCoord).x - hoverBoundingRect.right;
            const hoverClientTop =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;
            const hoverClientBottom =
                (clientOffset as XYCoord).y - hoverBoundingRect.bottom;

            if (
                (item.index > index &&
                    (hoverClientRight > -10 || hoverClientBottom > -10)) ||
                (item.index < index &&
                    (hoverClientLeft < 10 || hoverClientTop < 10))
            ) {
                return;
            }

            moveCard(item.index, index);
            item.index = index;
        },
        100,
    );

    const [{ isDragging }, drag] = useDrag({
        // monitor.getItem() 의 내용으로 들어갈 값을 정의합니다.
        // type 값은 무조건 설정되어 있어야 합니다. (useDrop의 accept와 일치시켜야 함)
        type: ItemTypes.CARD,
        item: { id, index },
        // Return array의 첫번째 값에 들어갈 객체를 정의합니다.
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        // 드래그가 완전히 끝났을때 실행됩니다. 보통 여기에서 Redux dispatch를 많이 실행시킵니다.
    });

    const [, drop] = useDrop<DragItem>({
        accept: ItemTypes.CARD,
        hover: (item, monitor) => throttleHoverItem(monitor, item, index),
    });

    // const [, drop] = useDrop<
    //     DragItem,
    //     void,
    //     { handlerId: Identifier | null; isOver: boolean }
    // >({
    //     accept: ItemTypes.CARD,
    //     collect(monitor) {
    //         return {
    //             handlerId: monitor.getHandlerId(),
    //             isOver: !!monitor.isOver,
    //         };
    //     },
    //     hover(item: DragItem, monitor) {
    //         const dragIndex = item.index;
    //         const dragId = item.id;
    //         const hoverIndex = index;
    //         const hoverId = id;

    //         if (dragIndex === hoverIndex || dragId === hoverId) return;

    //         // object rect for hover obj
    //         const hoverBoundingRect = ref.current!.getBoundingClientRect();

    //         // const hoverMiddleY =
    //         //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    //         // //mouse point offset(x, y)
    //         // const clientOffset = monitor.getClientOffset();

    //         // const hoverClientY =
    //         //     (clientOffset as XYCoord).y - hoverBoundingRect.top;

    //         moveCard(dragIndex, hoverIndex);
    //         item.index = hoverIndex;
    //         index = dragIndex;
    //     },
    //     drop(item: DragItem, monitor) {},
    // });

    drag(drop(ref));
    return (
        <CardElement
            id={id}
            ref={ref}
            isDragging={isDragging}
            backgroundColor={backgroundColor}
        >
            {text}
        </CardElement>
    );
};
