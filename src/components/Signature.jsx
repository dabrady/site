/** @jsxImportSource theme-ui */

import dayjs from 'dayjs';
import dayjs_relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(dayjs_relativeTime);

import { Box } from "theme-ui";

import { smallCaps } from '@styles/theme';

export default function Signature({ date }) {
  return (
    <Box sx={{ paddingTop: '2.3rem' }}>
      <hr sx={{ marginBottom: '0.3rem' }}/>
      <small sx={{
        fontFamily: smallCaps('body'),
        fontFeatureSettings: "'c2sc'",
        float: 'right',
        textAlign: 'right',
      }}>
        <em>
          ~ Daniel.
          <br/>
          {date && (
            <span title={dayjs(date).format('HH:mm:ss @ D MMMM, YYYY')}>
              {dayjs(date).fromNow()}
            </span>
          )}
        </em>
      </small>
    </Box>
  );
}
