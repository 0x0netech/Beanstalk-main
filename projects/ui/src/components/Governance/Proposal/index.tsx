import React from 'react';
import {
  Box,
  Card,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import MarkdownWrapper from '~/components/Common/MarkdownWrapper';
import ProposalStats from '~/components/Governance/Proposals/ProposalStats';
import { Proposal } from '~/util/Governance';

import { FC } from '~/types';
import useProposalBlockData from '~/hooks/beanstalk/useProposalBlockData';
import Row from '~/components/Common/Row';
import { FontSize } from '~/components/App/muiTheme';

const ProposalContent: FC<{
  proposal: Proposal;
  quorum: ReturnType<typeof useProposalBlockData>;
}> = (props) => {
  const pctOfQuorum = props.quorum?.data.pctOfQuorum;
  const body = (props.proposal?.body || '').replaceAll(
    'ipfs://',
    'https://cf-ipfs.com/ipfs/'
  );
  const votingOver = props.proposal.end <= (new Date().valueOf()) / 1000;

  return (
    <Card sx={{ p: 2 }}>
      <Row justifyContent="space-between">
        <Stack gap={1}>
          <Typography variant="h2">{props.proposal?.title}</Typography>
          <ProposalStats
            proposal={props.proposal}
            quorum={props.quorum}
            showLink
          />
        </Stack>
        {pctOfQuorum && pctOfQuorum > 0 && (
          <Tooltip
            title={`${props.quorum.data.tag} ${votingOver ? 'was' : 'is'} ~${(pctOfQuorum * 100).toFixed(
              1
            )}% of the way to reaching quorum.`}
          >
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              <CircularProgress
                variant="determinate"
                value={Math.min(pctOfQuorum * 100, 100)}
                sx={{ position: 'relative', mx: 'auto' }}
                size={45}
              />
              <Box
                sx={{
                  top: 0,
                  right: 0,
                  position: 'absolute',
                  height: '45px',
                  width: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: FontSize.xs,
                }}
              >
                {parseInt(Math.min(pctOfQuorum * 100, 100).toString(), 10)}%
              </Box>
            </Box>
          </Tooltip>
        )}
      </Row>
      <Box maxWidth="100%" mt={1}>
        <MarkdownWrapper>{body}</MarkdownWrapper>
      </Box>
    </Card>
  );
};

export default ProposalContent;
