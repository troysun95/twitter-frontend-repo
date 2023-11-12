import clsx from "clsx";
import styles from "styles/SwitchButtonPanel.module.scss";
function SwitchButton({
  title,
  id,
  userContent,
  value,
  handleChangeUserContent,
}) {
  return (
    <div
      className={clsx({
        [styles.button]: userContent !== value,
        [styles.active]:
          userContent === value || (userContent === "" && value === "tweets"),
      })}
      onClick={(e) => {
        handleChangeUserContent(value);
      }}
      id={id}
    >
      <span>{title}</span>
    </div>
  );
}

export default function SwitchButtonPanel({
  userContent,
  handleChangeUserContent,
}) {
  return (
    <div className={styles.buttonPanel}>
      <SwitchButton
        title="推文"
        value="tweets"
        id={0}
        userContent={userContent}
        handleChangeUserContent={handleChangeUserContent}
      />
      <SwitchButton
        title="回覆"
        value="replies"
        id={1}
        handleChangeUserContent={handleChangeUserContent}
      />
      <SwitchButton
        title="喜歡的內容"
        value="likes"
        id={2}
        handleChangeUserContent={handleChangeUserContent}
      />
    </div>
  );
}
