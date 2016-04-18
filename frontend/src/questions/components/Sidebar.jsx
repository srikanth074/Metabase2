import React, { PropTypes } from "react";
import { Link } from "react-router";
import S from "./Sidebar.css";
import cx from 'classnames';
import Icon from "metabase/components/Icon.jsx";

import LabelIcon from "./LabelIcon.jsx";

import { pure } from "recompose";

const Sidebar = ({ sections, topics, labels, style, className }) =>
    <div className={cx(S.sidebar, className)} style={style}>
        <ul>
            {sections.map(section =>
                <QuestionSidebarItem key={section.id} href={"/questions/" + section.id} {...section} />
            )}
            {/*
            <QuestionSidebarSectionTitle name="Topics" href="/questions/edit/topics" />
            {topics.map(topic =>
                <QuestionSidebarItem key={topic.id} href={"/questions/topics/"+topic.slug} {...topic} />
            )}
            */}
            <QuestionSidebarSectionTitle name="Labels" href="/questions/edit/labels" />
            {
              labels.length > 0 ? (
                labels.map(label =>
                  <QuestionSidebarItem key={label.id} href={"/questions/label/"+label.slug} {...label} />
                )
              ) : (
                  <div className={S.noLabelsMessage}>
                    <Icon name="label" />
                    Create labels to group and manage questions.
                  </div>
                )
            }
            <li className={S.divider} />
            <QuestionSidebarItem name="Archive" href="/questions/archived" icon="archive" />
        </ul>
    </div>

const QuestionSidebarSectionTitle = ({ name, href }) =>
    <li>
        <Link to={href} className={S.sectionTitle} activeClassName={S.selected}>{name}</Link>
    </li>

const QuestionSidebarItem = ({ name, icon, href }) =>
    <li>
        <Link to={href} className={S.item} activeClassName={S.selected}>
            <LabelIcon className={S.icon} icon={icon}/>
            <span className={S.name}>{name}</span>
        </Link>
    </li>

export default pure(Sidebar);
