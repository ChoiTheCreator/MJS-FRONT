/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Bold, Code, Heading1, Heading2, Heading3, Heading4, Image, Italic, Link2, Quote, Strikethrough } from 'lucide-react';
import { useRef, useState } from 'react';

const toolbarIconSize = 20

function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([
    { id: 1, type: 'h1', content: '이 텍스트를 편집하세요.' },
    { id: 2, type: 'p', content: '또 다른 텍스트입니다.' },
    { id: 3, type: 'p', content: '또 다른 텍스트입니다.' },
  ]);
  const lineRef = useRef([]);

  // 커서 위치 로드
  const getCursorPosition = (element) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    // 커서 위치 (텍스트 노드 내에서의 오프셋 값)
    return preCaretRange.toString().length;
  };

  // 커서 위치 이동
  const setCursorPosition = (element, position) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);

    // 커서 위치를 설정
    let charCount = 0, node;
    for (let i = 0; i < element.childNodes.length; i++) {
      node = element.childNodes[i];
      if (node.nodeType === 3) { // 텍스트 노드
        if (charCount + node.textContent.length >= position) {
          range.setStart(node, position - charCount);
          range.collapse(true);
          break;
        }
        charCount += node.textContent.length;
      }
    }

    selection.removeAllRanges();
    selection.addRange(range);
  };

  // 포커스 이벤트 처리
  const handleFocus = (id, index) => {
    // console.log(id)
    // console.log(lineRef.current)
    // console.log(getCursorPosition(e))
    const element = lineRef.current[index];
    if (element) {
      const cursorPosition = getCursorPosition(element);
      console.log(`Line ${id} (Index ${index}) Cursor Position:`, cursorPosition);
    }
  };

  // key 입력 처리
  const handleKeyDown = (e, index) => {
    const line = document.getElementById
    if (e.key === "ArrowUp" && index > 0) {
      lineRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowDown" && index < lineRef.current.length - 1) {
      lineRef.current[index + 1]?.focus();
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const newContent = [...contents]; // 새 배열로 복사
      const newId = contents.length + 1;
      newContent.splice(index + 1, 0, { id: newId, type: 'p', content: '' });
      setContents(newContent);

      setTimeout(() => {
        lineRef.current[index + 1]?.focus();
      }, 0); // DOM이 업데이트 될때까지 대기
    }


  };

  return (
    <div css={editorWrapper}>
      <div css={css`padding: 16px`}>
        <textarea
          id="title-editor"
          css={css`
            width: 100%;
            font-size: 32px;
            justify-content: center;
            border: none;
            outline: none;
            align-items: center;
            `}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='제목을 입력하세요' />
      </div>
      <div css={toolbar}>
        <div css={css`display: flex; padding: 0px 0px 16px 16px;`}>
          <button css={utilButton} onClick={() => handleInsertHeading(1)}><Heading1 size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleInsertHeading(2)}><Heading2 size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleInsertHeading(3)}><Heading3 size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleInsertHeading(4)}><Heading4 size={toolbarIconSize} /></button>
          <p>|</p>
          <button css={utilButton} onClick={() => handleMarkdownFormat('-')}><Bold size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('>')}><Italic size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('```')}><Strikethrough size={toolbarIconSize} /></button>
          <p>|</p>
          <button css={utilButton} onClick={() => handleMarkdownFormat('-')}><Quote size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('>')}><Link2 size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('```')}><Image size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('```')}><Code size={toolbarIconSize} /></button>
        </div>
      </div >
      <div css={css`padding: 16px; display: flex; flex-direction: row; height: 100;`}>
        <div>
          {contents.map(({ id, type, content }, index) => {
            const Tag = type; // 동적으로 태그 결정
            return (
              <Tag
                key={id}
                contentEditable
                suppressContentEditableWarning
                onFocus={() => handleFocus(id, index)}
                ref={(id) => (lineRef.current[index] = id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                css={css`outline: none; border: none;`}
              >
                {content}
              </Tag>
            );
          })}
        </div>
      </div>
      <div css={css`width: 100%`}>
        <button>저장</button>
      </div>
    </div >
  );
}

export default MarkdownEditor;

const editorWrapper = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: '20px';
  background: white;
`

const utilButton = css`
  background: none;
`

const textBoxWrapper = css`
  width: '100%';
  height: '300px';
  padding: '10px';
  fontSize: '16px';
`

const toolbar = css`
  width: 100%;
  height: 64px;
  padding: '10px';
`

const toolbarButton = css`
  padding: 34px;
  font-size: 12px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    background-color: ;
    color: white;
  }
`;
