import React, { ReactElement } from 'react'
import { useUserPreferences } from '@context/UserPreferences'
import ExplorerLink from '@shared/ExplorerLink'
import NetworkName from '@shared/NetworkName'
import Jellyfish from '@oceanprotocol/art/creatures/jellyfish/jellyfish-grid.svg'
import Copy from '@shared/atoms/Copy'
import Avatar from '@shared/atoms/Avatar'
import styles from './Account.module.css'
import { useProfile } from '@context/Profile'
import { accountTruncate } from '@utils/web3'
import accountAttributes from 'content/static_data/account-attributes.json'

function getOceanPermission(accountAddress: string): string | undefined {
  const account = accountAttributes.accountAddresses.find(
    (address) => address.accountAddress === accountAddress
  )
  return account?.abacAttributes?.subjectAttributes?.oceanPermission
}

export default function Account({
  accountId
}: {
  accountId: string
}): ReactElement {
  const { chainIds } = useUserPreferences()
  const { profile } = useProfile()
  const oceanPermission = getOceanPermission(accountId)

  return (
    <div className={styles.account}>
      <figure className={styles.imageWrap}>
        {accountId ? (
          <Avatar
            accountId={accountId}
            src={profile?.avatar}
            className={styles.image}
          />
        ) : (
          <Jellyfish className={styles.image} />
        )}
      </figure>

      <div>
        <h3 className={styles.name}>
          {profile?.name || accountTruncate(accountId)}
        </h3>
        {accountId && (
          <code
            className={styles.accountId}
            title={profile?.name ? accountId : null}
          >
            {accountId} <Copy text={accountId} />
          </code>
        )}
        <p>
          {accountId &&
            chainIds.map((value) => (
              <ExplorerLink
                className={styles.explorer}
                networkId={value}
                path={`address/${accountId}`}
                key={value}
              >
                <NetworkName networkId={value} />
              </ExplorerLink>
            ))}
        </p>
        {oceanPermission && (
          <span className={styles.tag}>{oceanPermission}</span>
        )}
      </div>
    </div>
  )
}
