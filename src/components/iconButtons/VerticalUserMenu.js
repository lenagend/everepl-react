import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function VerticalUserMenu({componentName}) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
            >
                <MoreVert />
            </MenuButton>
            <Menu placement="bottom-end">
                <MenuItem>
                    <ListItemDecorator>
                        <BookmarkIcon />
                    </ListItemDecorator>{' '}
                    북마크
                </MenuItem>
                <MenuItem>
                    <ListItemDecorator>
                        <FlagIcon />
                    </ListItemDecorator>{' '}
                    신고
                </MenuItem>
                {componentName === 'Comment' && (
                    <>
                        <ListDivider />
                        <MenuItem disabled>
                            <ListItemDecorator>
                                <Edit />
                            </ListItemDecorator>{' '}
                            수정
                        </MenuItem>
                        <MenuItem disabled variant="soft" color="danger">
                            <ListItemDecorator sx={{ color: 'inherit' }}>
                                <DeleteForever />
                            </ListItemDecorator>{' '}
                            삭제
                        </MenuItem>
                    </>
                )}
            </Menu>
        </Dropdown>
    );
}
